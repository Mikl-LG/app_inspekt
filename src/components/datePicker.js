import 'date-fns';
import frLocale from "date-fns/locale/fr";
import Moment from 'moment';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers({setAvalaibleDate}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvalaibleDate(Moment(date).valueOf());

    console.log('date : ',Moment(date).format('x'));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de disponibilité"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}