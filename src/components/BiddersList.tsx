import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    CircularProgress,
    makeStyles,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow,
    Theme, Typography,
    useTheme
} from "@material-ui/core";
import {columns} from "../utils/constants";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import {useHistory} from 'react-router-dom'

export const BiddersList = () => {
    const [biddersList, setBiddersList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<boolean>(false);
    const [bid, setBid] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const history = useHistory();

    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    useEffect(() => {
        axios.get("https://intense-tor-76305.herokuapp.com/merchants")
            .then((res: any) => {
                console.log(res.data)
                setBiddersList(res.data)
            })
    }, [])

    useEffect(() => {
        if (biddersList?.length) {
            setLoading(false)
        }
    }, [biddersList])

    const classes = useStyles();
    const theme = useTheme();

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const ascendingOrder = () => {
        let n = biddersList
            .map((r: any) => {
                const d = r.bids.sort((a: any, b: any) => {
                    return a.amount - b.amount;
                });

                return { ...r, bids: d };
            })
            .sort((a: any, b: any) => {
                return (a.bids[0] || {}).amount - (b.bids[0] || {}).amount;
            });
        setBiddersList(n);
        setSort(true);

    };

    const descendingOrder = () => {
        let n = biddersList.map((r: any) => {
                const d = r.bids.sort((a: any, b: any) => {
                    return b.amount - a.amount;
                });
                return { ...r, bids: d };
            }).sort((a: any, b: any) => {
                return (b.bids[0] || {}).amount - (a.bids[0] || {}).amount;
            });
        setBiddersList(n);
    };

    const bidingOriginal = () => {
        setSort(false);
        setBid(!bid);
    };

    return (
        <>
            {loading ? <CircularProgress color={"secondary"}/> : (
                <>
                    <Paper className={classes.root}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                                {column.id === "Bid" && (
                                                    <>
                                                        <span onClick={ascendingOrder}>
                                                            {" "}
                                                            <ArrowUpward/>
                                                        </span>
                                                        <span onClick={descendingOrder}>
                                                            <ArrowDownward/>
                                                        </span>
                                                    </>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        biddersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableRow onClick={() =>
                                                            history.push({
                                                                pathname: `/${row.id}`,
                                                                state: { bidder: row },
                                                            })}>
                                                            <TableCell className="name-img-section">
                                                                <img
                                                                    height={90}
                                                                    width={90}
                                                                    src={row.avatarUrl}
                                                                    alt=""
                                                                />
                                                                <h4>{row.firstname + " " + row.lastname}</h4>
                                                            </TableCell>
                                                            <TableCell>{row.email}</TableCell>
                                                            <TableCell>{row.phone}</TableCell>
                                                            <TableCell>
                                                                {row.hasPremium ? "Yes" : "No"}
                                                            </TableCell>
                                                            <TableCell className="bid-sec" align={"right"}>
                                                                <p className={!bid ? "" : "low-price"}>
                                                                    {sort ? (row.bids[0] || {}).amount : row.bids.length > 0 ? !bid ? Math.max.apply(
                                                                        Math, row.bids.map(function (o: any) {
                                                                            return o.amount;
                                                                        })
                                                                        )
                                                                        : Math.min.apply(
                                                                            Math, row.bids.map(function (o: any) {
                                                                                return o.amount;
                                                                            })
                                                                        )
                                                                        :
                                                                        "-"
                                                                    }
                                                                </p>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={biddersList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
            )}
        </>
    )

}

export default BiddersList
