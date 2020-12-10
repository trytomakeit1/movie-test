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

  let sortByColumn = "name";
  let sortDesc = false;

  let currentCookies = document.cookie;
  let cookies = currentCookies.split(";");

  for(let i = 0 ; i< cookies.length; i++) {
    let trimmedCookie =cookies[i];

    if(cookies[i].charAt(0) === " "){
      //clean the initial space
      trimmedCookie = cookies[i].substring(1);
    }
    if(trimmedCookie.indexOf("sortedBy") >= 0) {
      //we have sorted by column
      sortByColumn = trimmedCookie.slice(trimmedCookie.indexOf("=")+ 1);
    }
    if(trimmedCookie.indexOf("isSortedDesc") >= 0) {
      let sortDescStr = trimmedCookie.slice(trimmedCookie.indexOf("=")+ 1);
      if(sortDescStr === "true") sortDesc = true;
      else if(sortDescStr === "false") sortDesc = false;
    }

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
                id: sortByColumn,
                desc: sortDesc
            }
        ]
    }
    }, useSortBy );


  return(
        <table {...getTableProps()} className="moviesTable">
        <thead>
          {headerGroups.map((headerGroup, index1) => (
            <tr key={index1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index2) => {
                if(column.isSorted) {
                  document.cookie = "sortedBy=" + column.id;
                  document.cookie = "isSortedDesc=" + column.isSortedDesc;
                }
                return(
                <th key={index2} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
              )}
              )}
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
