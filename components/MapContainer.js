import React from 'react';
import { Col, Row } from 'reactstrap';
import Filters from '../components/Filters';
import Legend from '../components/Legend';
//import { format, getYear } from 'date-fns';
import Map from '../components/Map';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParcelPID: '',
      bufferDistance: 0,
      bufferParcels: [],
    };
  }

  // Update state when parcel is selected.
  handleParcelChange = p => {
    this.setState({
      selectedParcelPID: p,
    });
  };

  // Update state when buffer distance is updated.
  handleBufferChange = e => {
    this.setState({
      bufferDistance: e.target.value,
    });
  };

  // Update state when we have parcels for the mailing list.
  handleBufferParcels = parcels => {
    this.setState({
      bufferParcels: parcels,
    });
  };

  render() {
    return (
      <Row>
        <Col lg="3">
          <Filters
            selectedParcelPID={this.state.selectedParcelPID}
            handleBufferChange={this.handleBufferChange}
            bufferDistance={this.state.bufferDistance}
            bufferParcels={this.state.bufferParcels}
          />
          {/* add legend twice - once for when screen is large screen is small and it should display below the map */}{' '}
          <Col className="p-0 d-none d-lg-block">
            <Legend />
          </Col>{' '}
        </Col>{' '}
        <Col lg="9" className="p-lg-0 pr-md-5 pl-md-5">
          <Map
            handleParcelChange={this.handleParcelChange}
            // selectedParcelPID={this.selectedParcelPID}
            bufferDistance={this.state.bufferDistance}
            handleBufferParcels={this.handleBufferParcels}
          ></Map>{' '}
          {/* second instance of the legend component for when screen is small */}{' '}
          <Col className="d-sm-block d-md-block d-lg-none pl-0">
            <Legend />
          </Col>{' '}
        </Col>{' '}
      </Row>
    );
  }
}

export default MapContainer;
