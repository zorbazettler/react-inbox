import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

// The Items
const string1 = 'You cannot input the protocol without calculating the mobile RSS protocol!'
const string2 = 'connecting the system will not do anything, we need to input the mobile AI panel!'
const string3 = 'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!'
const string4 = 'We need to program the primary TCP hard drive!'
const string5 = 'If we override the interface, we can get to the HTTP feed through the external EXE interface!'
const string6 = 'We need to back up the wireless GB driver!'
const string7 = 'We need to index the mobile PCI bus!'
const string8 = 'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!'

//var all = false

const messages = [
  { id: 1, checked: false, starred: false, read: false, labels: ["dev", "personal"], subject: string1 },
  { id: 2, checked: true,  starred: false, read: false, labels: [],                  subject: string2 },
  { id: 3, checked: false, starred: false, read: false, labels: [ "dev"],            subject: string3 },
  { id: 4, checked: true,  starred: true,  read: true,  labels: [],                  subject: string4 },
  { id: 5, checked: false, starred: false, read: false, labels: ["personal"],        subject: string5 },
  { id: 6, checked: false, starred: false, read: true,  labels: [],                  subject: string6 },
  { id: 7, checked: false, starred: true,  read: true,  labels: ["dev", "personal"], subject: string7 },
  { id: 8, checked: false, starred: false, read: true,  labels: [],                  subject: string8 }
]

//console.log(JSON.stringify(messages))
ReactDOM.render(<App messages={ messages } />, document.getElementById('root'));
registerServiceWorker();


