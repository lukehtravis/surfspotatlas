import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  container: {
    margin: "0 auto",
    justifyContent: "center" 
  },
  avatar: {
    width: "200px",
    height: "200px"
  }
})

const Profile = () => {
  const { loading, user } = useAuth0();
  const styles = useStyles();
  console.log(user)
  if (loading || !user) {
    return "Loading...";
  }

  return (
    <>
      <Grid container className={styles.container}>
        <Grid item alignItems="center">
          <Avatar src={user.picture} alt="Profile" className={styles.avatar} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
