import React from "react";
import Jumbotron from "../Components/welcome/Jumbotron";
import PostContext from "../Context/PostContext";
import LifeCycleExample from "../Components/lifeCycleExample/LifeCycleExample"
import "../../src/index.css";
import MainLayout from "../MainLayouts/mainLayout";


const Home = () =>
{

  return (
    <PostContext>
      <MainLayout>
        {/* <ThemeMode /> */}
        <Jumbotron />
        <LifeCycleExample />
      </MainLayout>
    </PostContext>
  )
}

export default Home;
