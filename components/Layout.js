import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title> {this.props.title} </title>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://patterns.boston.gov/css/public.css"
          />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css"
            rel="stylesheet"
          />
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
          /> */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        {/* Make sure the heigh of the body element is the entire view port */}
        <style global jsx>{`
          // set fonts for elements
          body,
          h2,
          h3,
          h4,
          h5,
          label {
            font-family: 'Montserrat';
          }
          p,
          input {
            font-family: 'Lora';
            font-size: 18px;
          }
          p {
            font-style: italic;
            color: #616161;
          }
          // update link styles
          a:hover {
            text-decoration: none;
            color: #fb4d42;
          }
          // pop-up styles
          .dl-d {
            clear: none;
            width: 25%;
          }
          .dl-t {
            clear: none;
            width: 75%;
          }
          .dl-i {
            padding: 0.2rem !important;
          }
          // select dropdown styles
          .form-control {
            border: 2px solid #091f2f;
            font-family: 'Lora', serif;
            font-style: italic;
            border-radius: 0px;
          }
          .sel-c:after {
            top: 2px;
            bottom: 2px;
            right: 2px;
          }
          @media only screen and (max-width: 500px) {
            .mapboxgl-popup-tip {
              visibility: hidden;
            }
            .mapboxgl-popup-content {
              visibility: hidden;
            }
            #popupTable {
              display: block;
            }
          }
          // geocoder style
          .mapboxgl-ctrl-geocoder input {
            background-image: url(https://patterns.boston.gov/images/public/icons/search.svg);
            background-repeat: no-repeat;
            background-color: transparent;
            background-position: right;
            background-size: 20px 20px;
            position: relative;
            height: auto;
            border: none;
            border-bottom: 2px solid #091f2f;
            border-radius: 0;
            box-shadow: none;
            font-family: 'Lora';
            font-style: italic;
            font-size: 20px;
            min-width: 100%;
          }
          .mapboxgl-ctrl-geocoder--button {
            display: none !important;
          }
          .mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-loading {
            display: none;
          }
          .mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-search {
            display: none;
          }
          .geocoder-icon {
            visibility: hidden;
          }
          .suggestions {
            font-family: Lora;
            font-style: italic;
            position: absolute;
            z-index: 10000;
            background-color: white;
            border: 1px solid #091f2f;
            padding: 0;
            background-color: #f2f2f2;
          }
          .suggestions li {
            list-style-type: none;
            border-bottom: 1px solid #d2d2d2;
            padding: 5px;
          }
          .suggestions li:hover {
            background-color: #e0e0e0;
          }
          // button styles
          .btn {
            border-radius: 0px;
          }
          .btn-secondary {
            background-color: #288be4;
            border-color: #288be4;
          }
          .btn-secondary:focus {
            box-shadow: 0 0 0 0.2rem rgba(40, 139, 228, 0.5);
          }
          .btn-secondary:not(:disabled):not(.disabled):active {
            background-color: #288be4;
            border-color: #288be4;
          }
          .btn:hover:not(:disabled) {
            border-color: #fb4d42;
          }
        `}</style>
        {/* set container div with room for navbar  */}
        <div style={{ minHeight: 'calc(100vh - 125px)' }}>
          <Navbar>
            <div>
              <h1
                className="d-inline-block text-uppercase font-weight-bold mb-0 mt-1"
                style={{ letterSpacing: '1px' }}
              >
                Abutters Application
              </h1>
            </div>
            <img src="" style={{ width: '10em' }} />
            <div className="lo">
              <div className="lo-l">
                <a href="https://www.boston.gov/">
                  <img
                    src="https://patterns.boston.gov/images/public/logo.svg"
                    alt="Boston.gov"
                    className="lo-i"
                  />
                </a>
                <span className="lo-t">Mayor Martin J. Walsh</span>
              </div>
            </div>
          </Navbar>
          {/* add secondary navbar */}
          <nav className="nv-s">
            <input
              type="checkbox"
              id="nv-s-tr"
              className="nv-s-tr"
              aria-hidden="true"
              value="on"
            />
            <ul className="nv-s-l">
              <li className="nv-s-l-i">
                <label htmlFor="nv-s-tr" className="nv-s-l-b">
                  Navigation
                </label>
              </li>
              <li className="nv-s-l-i">
                <a
                  className={`nv-s-l-a ${
                    this.props.indexPage ? 'nv-s-l-a--active' : ''
                  }`}
                  href="/abutters-app/"
                >
                  View the map
                </a>
              </li>
              <li className="nv-s-l-i">
                <a
                  className="nv-s-l-a"
                  href="https://www.cityofboston.gov/assessing/search/"
                >
                  Assessing Online
                </a>
              </li>
              <li className="nv-s-l-i">
                <a
                  className={`nv-s-l-a ${
                    this.props.aboutPage ? 'nv-s-l-a--active' : ''
                  }`}
                  href="/abutters-app/about"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
          {this.props.children}
        </div>
        {/* add footer */}
        <footer
          className="ft"
          style={{
            position: 'relative',
            zIndex: '2',
          }}
        >
          <div className="ft-c">
            <ul className="ft-ll ft-ll--r">
              <li className="ft-ll-i">
                <a
                  href="http://www.cityofboston.gov/311/"
                  className="ft-ll-a lnk--yellow"
                >
                  <span className="ft-ll-311">BOS:311</span>
                  <span className="tablet--hidden"> - </span>Report an issue
                </a>
              </li>
            </ul>
            <ul className="ft-ll">
              <li className="ft-ll-i">
                <a
                  href="https://www.boston.gov/departments/mayors-office/martin-j-walsh"
                  className="ft-ll-a"
                >
                  Mayor Martin J Walsh
                </a>
              </li>
              <li className="ft-ll-i">
                <a
                  href="https://www.boston.gov/departments/innovation-and-technology/privacy-and-security-statement"
                  className="ft-ll-a"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="ft-ll-i">
                <a href="https://www.data.boston.gov" className="ft-ll-a">
                  Analyze Boston
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.full.min.js" />
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  indexPage: PropTypes.bool,
  aboutPage: PropTypes.bool,
};
