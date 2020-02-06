import React from 'react';
import { Card, Form, Input, Label, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

export default function Filters(props) {
  // We set up an empty array to house the data we'll export to csv.
  const csvData = [];
  // TODO: figure out what fields are actually needed here.
  props.bufferParcels.forEach(feature => csvData.push(feature.properties));

  return (
    <div>
      <Card className="border-0 pt-4 ml-1 mr-2">
        <Label htmlFor="geocoder" className="font-weight-bold text-uppercase">
          Address Search
        </Label>
        <div id="geocoder" style={{ width: '100%' }} />
      </Card>
      <Card className="border-0 pt-5 ml-1 mr-2 pb-3">
        <Form className="m-1">
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
          <Button onClick={props.searchForParcel}>Search</Button>
        </Form>
      </Card>
      <Card className="border-0 pt-2 ml-1 mr-2 pb-3">
        <Form className="m-1">
          <FormGroup>
            <Label
              htmlFor="selectedParcelID"
              className="font-weight-bold text-uppercase"
            >
              Selected Parcel
            </Label>
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
            <Button onClick={props.updateParcelBuffer}>Buffer Parcels</Button>
          </FormGroup>
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
  updateParcelBuffer: PropTypes.func,
  handleParcelIDSearch: PropTypes.func,
  searchedParcelID: PropTypes.string,
  searchForParcel: PropTypes.func,
};
