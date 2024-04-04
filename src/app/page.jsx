
import { Box, Typography } from "@mui/material";
import styles from "../styles/page.module.css";
import Navbar from "@/components/Navbar";
import MainPoster from "@/components/MainPoster";
import UserCount from "@/components/UserCount";
import Information from "@/components/Information";



const Home = () => {
  
  return (
  <>
  <MainPoster/>
 <UserCount/>
 <Information/>
  </>
  );
};

export default Home;