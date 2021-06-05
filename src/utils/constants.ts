import BiddersList from "../components/BiddersList";
import Bidder from "../components/Bidder";

export const routes = [
    { path: "/", name: "biddersList", component: BiddersList },
    { path: "/:id", name: "bidder", component: Bidder },
];
