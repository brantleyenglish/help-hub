import React from "react";
import ClientSearch from "../components/clientList/clientSearch";
import ClientProf from "../components/clientList/clientCard";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Paginator from './Paginator';
import TableHeader from './TableHeader';
import TableData from './TableData';

import './App.css';

const data = [
  { name: 'Porsche', age: 2, color: 'Blue' },
  { name: 'BMW', age: 1, color: 'Grey' },
  { name: 'Renault', age: 2, color: 'Yellow' },
  { name: 'Volkswagen', age: 7, color: 'Matte Red' },
  { name: 'Porsche', age: 2, color: 'Silver Grey' },
  { name: 'Jaguar', age: 6, color: 'Electric Blue' },
  { name: 'Mistubishi', age: 4, color: 'Black' },
  { name: 'Toyota', age: 9, color: 'Copper' },
  { name: 'Honda', age: 12, color: 'Biege' },
].map((d, id) => ({ ...d, id }));

const meta = [
  {
    key: 'id',
    text: 'ID',
    sort: true,
  },
  {
    key: 'name',
    text: 'Automobile Company',
    sort: true,
  },
  {
    key: 'age',
    text: 'Years Since Purchase',
    sort: true,
  },
  {
    key: 'color',
    text: 'Color',
    sort: true,
  },
]

const pageSize = 5;

function normalizeData(data) {
  return data.map(td => {
    const keys = Object.keys(td);
    return keys.map(key => ({ key, text: td[key] }));
  });
}


const compare = {
  '>': (d1, d2) => d1 > d2,
  '<': (d1, d2) => d1 < d2,
}

function App() {
  const [headerMeta, setHeaderMeta] = useState(meta);
  const [tableData, setTableData] = useState([]);
  const [sortBy, setSortBy] = useState({ key: null, order: '>' });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function sortFunc(m) {
      setSortBy({ key: m.key, order: sortBy.order === '>' ? '<' : '>' });
    }

    setHeaderMeta(
      (currentHeaderMeta) => currentHeaderMeta.map((m) => m.sort ? { ...m, sortFunc: () => sortFunc(m) } : m)
    );
  }, [sortBy]);

  useEffect(() => {
    // normalize data
    setTableData(normalizeData(data), meta);
  }, []);

  useEffect(() => {
    // sort
    setTableData(normalizeData(data.sort((d1, d2) => compare[sortBy.order](d1[sortBy.key], d2[sortBy.key]))));
  }, [sortBy])

  useEffect(() => {
    // paginate
    const startPointer = currentPage * pageSize;
    const endPointer = startPointer + pageSize
    setTableData(normalizeData(data.slice(startPointer, endPointer)));
  }, [sortBy, currentPage]);

  return (
    <div className="container">
      <TableHeader headers={headerMeta} />
      <TableData data={tableData} meta={meta} />
      <Paginator page={currentPage} setPage={setCurrentPage} size={Math.ceil(data.length / pageSize)} />
    </div>
  );
}

export default ClientList;
