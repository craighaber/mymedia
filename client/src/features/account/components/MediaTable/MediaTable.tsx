import './MediaTable.scss'
import { Media } from '../models/Media'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, SizeColumnsToFitGridStrategy, GridOptions } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '../../../../globals/constants/RoutePaths';

function MediaTable({mediaList}: {mediaList: Media[]}){
    const navigate = useNavigate()
    const [colDefs, setColDefs] = useState<ColDef[]>([
        {headerName: 'Title', field: "title", colId: "title", flex: 5},
        {headerName: 'Category', field: "category", colId: "category", flex: 4,}, 
        {headerName: 'Rating', field: "rating", colId: "rating", flex: 3, filter: 'agNumberColumnFilter', valueGetter: (params: any) => params.data.rating ? +params.data.rating: null},
        // {headerName: 'Review', field: "review", colId: "review"}
    ])

    // function handleResize(clientWidth: number){
    //     console.log('clientWidth', clientWidth)
    //     if (clientWidth > 768){
    //         if (isMobileView !== false)  {
    //             setIsMobileView(false)  
    //             gridRef.current.api.sizeColumnsToFit();  
    //         }   
    //     } else {
    //         if (isMobileView !== true) {
    //             setIsMobileView(true)
    //             gridRef.current.api.sizeColumnsToFit();  
    //         }
    //     }
    // }

    const defaultColDef: ColDef = {
        filter: "agTextColumnFilter",
        suppressHeaderFilterButton: true,
        suppressSizeToFit: false,
        lockPosition: true,
    }
    // const autoSizeStrategy: SizeColumnsToFitGridStrategy  = {
    //     type: 'fitGridWidth',

    //     columnLimits: [
    //         {colId: 'title', minWidth: 120},
    //         {colId: 'category', minWidth: 100},
    //         {colId: 'rating', minWidth: 100},
    //         // { colId: 'review', minWidth: 500 }
    //     ]
    // };
    const gridRef = useRef<any>();
    const gridOptions: GridOptions = {
        onRowClicked: (event) => {
            navigate(RoutePaths.MediaEntryBase + `${event.data.id}`)
        }
    }
    console.log(mediaList)
    return (
        <div className='media-table-container'>
            <div className="ag-theme-quartz media-table">
                <AgGridReact
                    ref={gridRef}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    rowData={mediaList}
                    gridOptions={ gridOptions }
                    suppressMenuHide={true}
                    // domLayout='autoHeight' This loads all rows into the DOM
                />
             </div>        
        </div>

    )
}

export default MediaTable