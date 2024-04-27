import './MediaTable.scss'
import { Media } from '../models/Media'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, SizeColumnsToFitGridStrategy, GridOptions } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MediaTable({mediaList}: {mediaList: Media[]}){
    const navigate = useNavigate()
    const [colDefs, setColDefs] = useState<ColDef[]>([
        {headerName: 'Title', field: "title", colId: "title"},
        {headerName: 'Category', field: "category", colId: "category"},
        {headerName: 'Rating', field: "rating", colId: "rating", filter: 'agNumberColumnFilter', valueGetter: (params: any) => params.data.rating ? +params.data.rating: null},
        {headerName: 'Review', field: "review", colId: "review"}
    ])
    const defaultColDef: ColDef = {
        filter: "agTextColumnFilter",
        suppressHeaderFilterButton: true,
    }
    const autoSizeStrategy: SizeColumnsToFitGridStrategy  = {
        type: 'fitGridWidth',

        columnLimits: [
            {colId: 'title', minWidth: 180, maxWidth: 250},
            {colId: 'category', minWidth: 180, maxWidth: 200},
            {colId: 'rating', minWidth: 180, maxWidth: 150},
            { colId: 'review', minWidth: 500 }
        ]
    };
    const gridRef = useRef<any>();
    const gridOptions: GridOptions = {
        onRowClicked: (event) => {
            navigate()
        }
    }
    return (
        <div className='media'>
        { !!mediaList && mediaList.length > 0 ?   
            <div className="ag-theme-quartz media-table">
                <AgGridReact
                    ref={gridRef}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    rowData={mediaList}
                    autoSizeStrategy={autoSizeStrategy}
                    gridOptions={ gridOptions }
                    suppressMenuHide={true}
                />
             </div>        
        : null} 
        </div>

    )
}

export default MediaTable