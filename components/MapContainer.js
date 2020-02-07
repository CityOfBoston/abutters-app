import React from 'react';
import { Col, Row } from 'reactstrap';
import Filters from '../components/Filters';
import Legend from '../components/Legend';
import Map from '../components/Map';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParcel: undefined,
      selectedParcelPID: '',
      bufferDistance: 0,
      bufferParcels: '',
      bufferButtonClicked: false,
      searchedParcelID: '',
      searchForParcelIDButtonClicked: false,
      ownershipInfo: [],
    };
  }

  // Update state when parcel is selected.
  handleParcelChange = parcel => {
    parcel != undefined
      ? this.setState({
          selectedParcel: parcel,
          selectedParcelPID: parcel.properties.PID_LONG,
        })
      : this.setState({
          selectedParcel: null,
          selectedParcelPID: null,
        });
  };

  // Update state when parcel ID is changed.
  handleParcelIDSearch = e => {
    this.setState({
      searchedParcelID: e.target.value,
    });
  };

  // Update state when "Search" button is clicked when looking for parcel ID.
  searchForParcelIDButton = () => {
    this.state.searchForParcelIDButtonClicked == true
      ? this.setState({ searchForParcelIDButtonClicked: false })
      : this.setState({ searchForParcelIDButtonClicked: true });
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

  updateParcelBufferButton = () => {
    this.state.bufferButtonClicked == true
      ? this.setState({ bufferButtonClicked: false })
      : this.setState({ bufferButtonClicked: true });
  };

  handleOwnershipInfo = ownershipInfo => {
    console.log(ownershipInfo);
    this.setState({
      ownershipInfo: ownershipInfo,
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
            updateParcelBufferButton={this.updateParcelBufferButton}
            searchedParcelID={this.state.searchedParcelID}
            handleParcelIDSearch={this.handleParcelIDSearch}
            searchForParcelIDButton={this.searchForParcelIDButton}
            selectedParcel={this.state.selectedParcel}
            ownershipInfo={this.state.ownershipInfo}
          />
          {/* add legend twice - once for when screen is large screen is small and it should display below the map */}{' '}
          <Col className="p-0 d-none d-lg-block">
            <Legend />
          </Col>{' '}
        </Col>{' '}
        <Col lg="9" className="p-lg-0 pr-md-5 pl-md-5">
          <Map
            handleParcelChange={this.handleParcelChange}
            bufferDistance={this.state.bufferDistance}
            handleBufferParcels={this.handleBufferParcels}
            bufferButtonClicked={this.state.bufferButtonClicked}
            searchedParcelID={this.state.searchedParcelID}
            searchForParcelIDButtonClicked={
              this.state.searchForParcelIDButtonClicked
            }
            selectedParcel={this.state.selectedParcel}
            handleOwnershipInfo={this.handleOwnershipInfo}
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
