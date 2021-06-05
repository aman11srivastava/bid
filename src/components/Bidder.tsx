import React from "react";
import {useHistory} from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";

// @ts-ignore
export const Bidder = ({location}) => {

    const history = useHistory();
    const bidderData = location.state.bidder.bids;
    console.log(bidderData)

    if (bidderData.length === 0){
        return (
            <>
                No bids
            </>
        )
    }
    else {
        return (
            <>
                <Button style={{display: 'flex', justifyContent: 'end', margin: 30}} variant={"contained"} color={"secondary"} onClick={() => history.push('/')}>Back</Button>
                <h1 style={{textDecoration: 'underline'}}>Number of Bids: {bidderData.length}</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant={"h4"}>Bid Id</Typography></TableCell>
                            <TableCell><Typography variant={"h4"}>Car Title</Typography></TableCell>
                            <TableCell><Typography variant={"h4"}>Bid Amount</Typography></TableCell>
                            <TableCell><Typography variant={"h4"}>Bid Created At</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bidderData.map((bidDetails: any) => (
                            <TableRow key={bidDetails.id}>
                                <TableCell><Typography variant={"body1"}>{bidDetails.id}</Typography></TableCell>
                                <TableCell><Typography variant={"body1"}>{bidDetails.carTitle}</Typography></TableCell>
                                <TableCell><Typography variant={"body1"}>${bidDetails.amount}</Typography></TableCell>
                                <TableCell><Typography variant={"body1"}>{bidDetails.created}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }
}

export default Bidder
