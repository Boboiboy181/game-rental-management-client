import { Button, Space, Tag } from 'antd';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Return } from '../types/return.type';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import PageComponent from '../components/page.component.tsx';
import { CreateInvoice } from '../types/create-invoice.type';
import { Invoice } from '../types/invoice.type';
import { NavigationKeyContexts } from '../context/navigation-key.context.ts.tsx';

type DataType = {
    key: React.Key;
    returnCode: string;
    rentalCode: string;
    customer: string;
    paymentState: string;
    estimatedPrice: string;
    createdAt: string;
};
const DetailInvoice = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [returns, setReturns] = useState<Return[]>([]);
    const [filteredReturns, setFilteredReturns] = useState<Return[]>(returns);
    const [searchField, setSearchField] = useState('');
    const { setNavigationKey } = useContext(NavigationKeyContexts);
    const [invoice, setInvoice] = useState<Invoice>({} as Invoice);
    const [invoiceDetail, setInvoiceDetail] = useState<CreateInvoice>({} as CreateInvoice);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
    
useEffect(() => {
    const fetchReturns = async () => {
        try {
            const response = await axios.get(
                `https://game-rental-management-app-yh3ve.ondigitalocean.app/return`,
            );
            setReturns(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching returns:', error);
        }
    };

    fetchReturns();
}
, []
)
;

useEffect(() => {
    const fetchInvoice = async () => {
        try {
            const response = await axios.get(
                `https://game-rental-management-app-yh3ve.ondigitalocean.app/invoice/${invoiceID}`,
            );
            setInvoice(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching invoice:', error);
        }
    };

    fetchInvoice();
}
, []   
)
;

export default DetailInvoice;