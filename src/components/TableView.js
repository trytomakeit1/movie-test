import React, { Fragment } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useHistory} from 'react-router-dom';


const TableView = (props) => {

  const data = React.useMemo(() => props.data.moviesList, []);
  const history = useHistory();

  const detailsHandler = (e, movie) => {
    e.preventDefault();
    history.push("movie-details", {movie: movie});

  }
  const columns = React.useMemo(
    () => [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Release date",
          accessor: "releaseDate"
        },
        {
          Header: "Duration",
          accessor: "duration"
        },
        {
          Header: "Actors",
          accessor: "actors"
        },
        {
          Header: "Average user rating",
          accessor: "averageRating"
        },
        {
          Header: 'Details',
          accessor: 'id',
          Cell: ({ cell }) => (
            <button className="button" value={cell.row.values.id} onClick={(e) => detailsHandler(e,cell.row.original)}>
              Go to details
            </button>
          )
        },
        
  ], []);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({
      columns,
      data,
      initialState: {
        sortBy: [
            {
                id: 'name',
                desc: false
            }
        ]
    }
    }, useSortBy );


  return(
        <table {...getTableProps()} className="moviesTable">
        <thead>
          {headerGroups.map((headerGroup, index1) => (
            <tr key={index1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index2) => (
                <th key={index2} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return <td key={index} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              
              </Fragment>
            );
          })}
        </tbody>
      </table>)
}

export default TableView;
