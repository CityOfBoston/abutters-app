import React from 'react';
import { Card, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

export default function Filters(props) {
  // We set up an empty array to house the data we'll export to csv.
  const csvData = [];
  // TODO: figure out what fields are actually needed here.
  if (props.bufferParcels.length > 1) {
    props.bufferParcels.forEach(parcel => csvData.push(parcel.properties));
  }

  return (
    <div>
      <Card className="border-0 pt-4 ml-1 mr-2">
        <Label
          htmlFor="geocoder"
          className="font-weight-bold text-uppercase m-1"
        >
          Address Search
        </Label>
        <div id="geocoder" style={{ width: '100%' }} className="m-1" />
        <FormGroup className="m-1 pt-3">
          <Label
            htmlFor="parcelIdSearch"
            className="font-weight-bold text-uppercase"
          >
            Parcel Search
          </Label>
          <Input
            id="parcelIdSearch"
            type="text"
            onChange={props.handleParcelIDSearch}
            name="parcelID"
            value={props.searchedParcelID}
            className="mb-2"
          ></Input>
          <Button onClick={props.searchForParcelIDButton}>Search</Button>
        </FormGroup>
        <FormGroup className="m-1 pt-3">
          <Label
            htmlFor="selectedParcelID"
            className="font-weight-bold text-uppercase"
          >
            Selected Parcel
          </Label>
          <p>
            {props.selectedParcelPID == null
              ? 'No parcel found'
              : props.selectedParcelPID}
          </p>
        </FormGroup>
      </Card>
      <Card className="border-0 pt-2 ml-1 mr-2 pb-3">
        <Form>
          <FormGroup className="m-1">
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
            {/* {props.selectedParcelPID} */}
            <Button onClick={props.updateParcelBufferButton}>
              Buffer Parcels
            </Button>
            {props.bufferParcels == null ? (
              <p>Please select a parcel before buffering.</p>
            ) : null}
          </FormGroup>
          <FormGroup className="m-1 mt-3">
            <Label
              htmlFor="bufferDistance"
              className="font-weight-bold text-uppercase"
            >
              {/* We only show the csv download link if they array has info in it. */}
              {csvData.length > 0 ? (
                <CSVLink data={csvData} filename={'mailingList.csv'}>
                  Download Mailing List CSV
                </CSVLink>
              ) : null}
            </Label>
          </FormGroup>
        </Form>
      </Card>
    </div>
  );
}
Filters.propTypes = {
  selectedParcelPID: PropTypes.string,
  handleBufferChange: PropTypes.func,
  bufferDistance: PropTypes.number,
  bufferParcels: PropTypes.array,
  updateParcelBufferButton: PropTypes.func,
  handleParcelIDSearch: PropTypes.func,
  searchedParcelID: PropTypes.string,
  searchForParcelIDButton: PropTypes.func,
  selectedParcel: PropTypes.object,
};
