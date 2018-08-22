import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { IPhoneBook } from '../../models/phoneBook';
import { phoneBookActions } from './actions';
import { getPageTitle } from '../../utils/getPageTitle';
import { withStyles, WithStyles, Paper, Typography } from '@material-ui/core';
import Spinner from '../../UI/Spinner';
import PhoneBookTable from './views/PhoneBookTable';
import PhoneBookForm from './views/PhoneBookForm';

const decorate = withStyles(({ mixins, palette }) => ({
  parent: {
    height: '100%',
    width: '100%',
    maxWidth: 1100
  },
  title: {
    color: palette.primary.main,
    fontWeight: 'bold' as 'bold'
  },
  paper: mixins.gutters({
    paddingTop: 25,
    paddingBottom: 25,
  })
}));

interface PropTypes {
  isLoading: boolean
}

type Props =
  PropTypes
  & typeof phoneBookActions
  & WithStyles<'parent' | 'title' | 'paper'>;

const PhoneBook = decorate(
  class extends React.PureComponent<Props, {}> {
    public componentDidMount() {
      document.title = getPageTitle('PhoneBook');
      this.props.loadPhoneBookAction();
    }

    public render() {
      const { classes, isLoading } = this.props;
      return (
        <div className={classes.parent}>
          <Spinner loading={isLoading} />
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" component="h2" className={classes.title}>
              Phone Book
            </Typography>
            <PhoneBookForm onSubmit={this.submit} editPhoneBook={this.props.editPhoneBook} />
            <PhoneBookTable />
          </Paper>
        </div>
      );
    }

    private submit = (value: IPhoneBook) => {
      this.props.savePhoneBook(value);
    }
  });

export default connect(
  (state: ApplicationState) => ({
    isLoading: state.phoneBook.isLoading,
    phoneBooks: state.phoneBook.phoneBooks
  }),
  phoneBookActions
)(PhoneBook as any) as any;
