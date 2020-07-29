/* import React, { Component } from 'react'; */
import styled, { keyframes } from 'styled-components';
import {bounce} from 'react-animations';

const Bounce = styled.div`animation: 2s ${keyframes `${bounce}` } infinite`;

export default Bounce;