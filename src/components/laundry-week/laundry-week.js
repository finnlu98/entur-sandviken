import React, { useState, useEffect } from "react";
import moment from "moment";

import laundryData from "./laundry-week-data.json";
import "./laundry-week.css";
import logo from "./img/rodt_logo.png";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from "@table-library/react-table-library/table";

import { useTheme } from "@table-library/react-table-library/theme";

function LaundryWeek() {
  const currentWeek = moment().week();
  const [isHide, setHide] = useState(false);
  const [highlightRow, setHighlightRow] = useState(false);

  let data = { nodes: laundryData };

  data = {
    nodes: !isHide
      ? data.nodes.filter((week) => week.week === currentWeek)
      : data.nodes,
  };

  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
          background-color: transparent; 
          color: white;
        }
      `,

    BaseCell: `
        
    background-color: transparent;   
        text-align: center;
        font-weight: bold;
      `,
  });

  return (
    <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Vasking uke {currentWeek}</h5>
      </div>
      <div className="laundry-filter">
        <label htmlFor="complete">
          Utvid:
          <input
            id="complete"
            type="checkbox"
            checked={isHide}
            onChange={() => setHide(!isHide)}
          />
        </label>
      </div>

      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Uke</HeaderCell>
                <HeaderCell>Stue osv.</HeaderCell>
                <HeaderCell>Bad osv.</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((week) => (
                <Row key={week.week} item={week} className={week.className}>
                  <Cell>{week.week}</Cell>
                  <Cell>{week.stue}</Cell>
                  <Cell>{week.bad}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      <div className="rodt-slogan">
        <img src={logo} width={40} height={40}></img>
        <p>Fordi felleskap fungerer</p>
      </div>
    </div>
  );
}

export default LaundryWeek;
