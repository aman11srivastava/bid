import BiddersList from "../components/BiddersList";
import Bidder from "../components/Bidder";

export const columns = [
    { id: "Customer Name", label: "Customer Name", minWidth: 70 },
    {
        id: "Email",
        label: "Email",
        minWidth: 70,
        align: "right",
    },
    {
        id: "Phone",
        label: "Phone",
        minWidth: 70,
        align: "right",
    },
    {
        id: "Premium",
        label: "Premium",
        minWidth: 70,
        align: "right",
    },
    {
        id: "Bid",
        label: "Bid(Max/Min)",
        minWidth: 70,
        align: "right",
    },
];

export const routes = [
    { path: "/", name: "biddersList", component: BiddersList },
    { path: "/:id", name: "bidder", component: Bidder },
];
