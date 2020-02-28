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
          {/* When developing locally, this needs to be ./static/abutters-app.css. */}
          <link rel="stylesheet" href="/abutters-app/static/abutters-app.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        {/* Make sure the height of the body element is the entire view port and 
        set container div with room for navbar  */}
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
