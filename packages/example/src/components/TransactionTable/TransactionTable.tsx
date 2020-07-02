import React from "react";
import {Paper, Table, TableContainer, TableCell,
    TableRow, TableHead, TableBody} from '@material-ui/core/';
import {shortAddress} from "../../services/format";
import {formatBalance} from "@polkadot/util";
import {Transaction as ApiTransaction} from "@nodefactory/metamask-polkadot-types";

export interface Transaction {
    type: string;
    id: string;
    attributes: {
        block: string;
        value: number | string,
        fee: number,
        sender: {
            type: string;
            attributes: {
                address: string;
            }
        };
        destination: {
            attributes: {
                address: string;
            }
        }
    }
}

export function convertTransaction(tx: ApiTransaction): Transaction {
    return {
        id: tx.hash,
        type: "",
        attributes: {
            block: tx.block,
            value: tx.amount,
            destination: {
                attributes: {
                    address: tx.destination
                },
            },
            sender: {
                attributes: {
                    address: tx.sender
                },
                type: ""
            },
            fee: 10
        }
    }
}

export interface TransactionTableProps {
    txs: Transaction[];
}

export const TransactionTable = (props: TransactionTableProps) => {
    return (
        <TableContainer className="transtaction-table" component={Paper}>
            <Table 
            aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Transaction id</TableCell>
                    <TableCell align="center">Block</TableCell>
                    <TableCell align="center">Sender</TableCell>
                    <TableCell align="center">Destination</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Fee</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.txs.map(tx => (
                    <TableRow key={tx.id}>
                    <TableCell  align="left" component="th" scope="row">
                        {tx.id}
                    </TableCell>
                    <TableCell  align="center" component="th" scope="row">
                        {tx.attributes.block}
                    </TableCell>
                    <TableCell align="center">{shortAddress(tx.attributes.sender.attributes.address)}</TableCell>
                    <TableCell align="center">{shortAddress(tx.attributes.destination.attributes.address)}</TableCell>
                    <TableCell align="center">{formatBalance(tx.attributes.value, {decimals: 12, withSi: true, withUnit: "KSM"})}</TableCell>
                    <TableCell align="center">{formatBalance(tx.attributes.fee, {decimals: 12, withSi: true, withUnit: "KSM"})}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};