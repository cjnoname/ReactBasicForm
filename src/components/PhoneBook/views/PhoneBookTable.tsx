import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { ApplicationState } from '../../../store';
import { PhoneBook } from '../../../models/phoneBook';
import { Button } from '../../../UI/Button';
import { phoneBookActions } from '../actions';
import TextField from '@material-ui/core/TextField';

const columnData = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'PhoneNumber' },
  { id: 'actionButtons', numeric: false, disablePadding: false, label: '', disableSort: true },
];

class PhoneBookTableHeader extends React.Component<any, any> {
  public createSortHandler = (property: any) => (event: any) => {
    (this.props as any).onRequestSort(event, property);
  }

  public render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                {!column.disableSort &&
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                }
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const decorate = withStyles(({ spacing }) => ({
  root: {
    width: '100%',
    marginTop: spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto' as 'auto',
  }
}));

interface PropTypes {
  phoneBooks: List<PhoneBook>
}

type Props =
  PropTypes
  & typeof phoneBookActions
  & WithStyles<'root' | 'table' | 'tableWrapper'>;

const PhoneBookTable = decorate(
  class extends React.Component<Props, any> {
    constructor(props: any) {
      super(props);

      this.state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        filterText: ''
      };
    }

    public render() {
      const { classes, phoneBooks } = this.props;
      const { order, orderBy, selected, rowsPerPage, page, filterText } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, phoneBooks.count() - page * rowsPerPage);
      return (
        <>
          <TextField label="Filter..." onChange={(e) => this.setState({ filterText: e.target.value })} />
          <Paper className={classes.root} >
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <PhoneBookTableHeader
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={phoneBooks.count()}
                />
                <TableBody>
                  {phoneBooks
                    .filter(val =>
                      val.firstName.toUpperCase().includes(filterText.toUpperCase()) ||
                      val.lastName.toUpperCase().includes(filterText.toUpperCase()) ||
                      val.phoneNumber.toUpperCase().includes(filterText.toUpperCase())
                    )
                    .sort(this.getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n: PhoneBook) => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell>{n.firstName}</TableCell>
                          <TableCell>{n.lastName}</TableCell>
                          <TableCell>{n.phoneNumber}</TableCell>
                          <TableCell numeric>
                            <Button label="Edit" onClick={() => this.props.editPhoneBook(n)} />
                            &nbsp;
                          <Button label="Delete" onClick={() => this.props.deletePhoneBook(n.id)} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              count={phoneBooks.count()}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper >
        </>
      );
    }

    private handleRequestSort = (event: any, property: any) => {
      const orderBy = property;
      let order = 'desc';

      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }

      this.setState({ order, orderBy });
    }

    private handleClick = (event: any, id: any) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected: any = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      this.setState({ selected: newSelected });
    }

    private handleChangePage = (event: any, page: any) => {
      this.setState({ page });
    }

    private handleChangeRowsPerPage = (event: any) => {
      this.setState({ rowsPerPage: event.target.value });
    }

    private isSelected = (id: any) => this.state.selected.indexOf(id) !== -1;


    private getSorting = (order: any, orderBy: any) => {
      return order === 'desc'
        ? (a: any, b: any) => ((b[orderBy] ? b[orderBy].toLowerCase() : b[orderBy]) < (a[orderBy] ? a[orderBy].toLowerCase() : a[orderBy]) ? -1 : 1)
        : (a: any, b: any) => ((a[orderBy] ? a[orderBy].toLowerCase() : a[orderBy]) < (b[orderBy] ? b[orderBy].toLowerCase() : b[orderBy]) ? -1 : 1);
    }
  });

export default connect(
  (state: ApplicationState) => ({
    phoneBooks: state.phoneBook.phoneBooks
  }),
  phoneBookActions
)(PhoneBookTable as any) as any;
