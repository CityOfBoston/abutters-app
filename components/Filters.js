import React from 'react';
import { Card, Form, Input, Label, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';

export default function Filters(props) {
  const csvData = props.bufferParcels;
  return (
    <div>
      <Card className="border-0 pt-4 ml-1 mr-2">
        <div id="geocoder" style={{ width: '100%' }} />
      </Card>
      <Card className="border-0 pt-2 ml-1 mr-2 pb-3">
        <Form className="m-1">
          <FormGroup>
            <h5 className="font-weight-bold text-uppercase">Selected Parcel</h5>
            <p>{props.selectedParcelPID}</p>
            <Label
              htmlFor="bufferDistance"
              className="font-weight-bold text-uppercase"
            >
              Buffer Distance
            </Label>
            <Input
              id="bufferDistance"
              type="number"
              min={0}
              max={100000}
              onChange={props.handleBufferChange}
              name="bufferDistance"
              value={props.bufferDistance}
              className="mb-2"
            />
          </FormGroup>
        </Form>
      </Card>
      <Card>
        <div className="dl-t">
          {props.bufferParcels
            .map(parcel => `parcel: ${parcel.properties.PID_LONG} <br/>`)
            .join('')}
        </div>
      </Card>
      <Card>
        <CSVLink data={csvData} filename={'mailingList.csv'}>
          Download CSV Here
        </CSVLink>
      </Card>
    </div>
  );
}
Filters.propTypes = {
  selectedParcelPID: PropTypes.string,
  handleBufferChange: PropTypes.func,
  bufferDistance: PropTypes.number,
  bufferParcels: PropTypes.array,
};
