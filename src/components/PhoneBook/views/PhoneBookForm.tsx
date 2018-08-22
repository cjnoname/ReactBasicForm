import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as classNames from 'classnames';
import { List } from 'immutable';
import { ApplicationState } from '../../../store';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '../../../UI/Button';
import { Field } from '../../../models/shared/field';
import { validateAny } from '../../../utils/validation';
import SimpleFormList from '../../../UI/Form/simpleFormList';

interface Props {
  dispatch: any,
  handleSubmit: () => {},
  pristine: boolean,
  submitting: boolean,
  invalid: boolean,
  error: any,
  reset: any,
  editPhoneBook: any
}

const decorate = withStyles(({ mixins, spacing }) => ({
  form: {
    marginTop: '2em',
    padding: '1em',
    textAlign: 'right' as 'right'
  },
  item: {
    marginRight: 10
  },
  button: {
    width: '100%',
    marginTop: '2em'
  },
  buttonColor: {
    color: '#fff'
  }
}));

const fields = List<Field>([
  {
    name: 'id',
    type: 'hidden'
  },
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
    requiredPrompt: 'Please enter first name'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    required: true,
    requiredPrompt: 'Please enter last name'
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    required: true,
    requiredPrompt: 'Please enter phone number',
    isPhone: true,
    isPhonePrompt: 'Invalid phone number'
  },
].map(val => new Field(val)));

export const validator = (value: any, values: any, props: Props, name: string) => {
  const field = fields.find((field: Field) => field.name === name);
  if (field) {
    return validateAny(field, value);
  }
  return undefined;
};

let PhoneBookForm = decorate<Props>(({ dispatch, handleSubmit, pristine, invalid, submitting, error, classes, reset, editPhoneBook }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.form}>
      <SimpleFormList
        name="phoneBook"
        validator={validator}
        classes={classes}
        fields={fields}
      />
      <div className={classes.button}>
        <Button label="Save" type="submit" className={classNames(classes.buttonColor, classes.item)} disabled={submitting || pristine || invalid} />
        <Button label="Cancel" className={classes.buttonColor} onClick={() => { editPhoneBook(); reset(); }} />
      </div>
    </div>
  </form>
));

PhoneBookForm = reduxForm({
  form: 'phoneBook',
  enableReinitialize: true
})(PhoneBookForm as any) as any;

export default connect(
  (state: ApplicationState) => ({
    initialValues: state.phoneBook.editItem
  })
)(PhoneBookForm as any) as any;
