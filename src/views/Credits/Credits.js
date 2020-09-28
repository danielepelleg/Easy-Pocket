import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme";
import {Grid, Card, CardContent} from "@material-ui/core";
import CreditsCard from "./CreditsCards";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    root: {
        padding: theme.spacing(4),
    },
}));

class CreditsBase extends Component {

    render() {
        const authors = [
                {
                    name: "Daniele Pellegrini",
                    image:"https://www.flaticon.com/svg/static/icons/svg/616/616451.svg",
                    github: "https://github.com/danielepelleg",
                    email: "daniele.pellegrini@studenti.unipr.it",
                    color: "#068FE3"
                },
                {
                    name: "Guido Soncini",
                    image:"https://www.flaticon.com/svg/static/icons/svg/1970/1970703.svg",
                    github: "https://github.com/gweedo",
                    email: "guido.soncini1@studenti.unipr.it",
                    color: "#208B10"
                }
        ]

        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={3}>
                    { authors.map((_author) =>{
                        return(
                            <Grid
                                item
                                lg={6}
                                md={6}
                                xl={6}
                                xs={12}
                            >
                                <CreditsCard name = {_author.name} github={_author.github} email = {_author.email} image={_author.image} color = {_author.color}/>
                            </Grid>
                        );
                    })}
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}>
                            <Card style={{ opacity: 0.7 }}>
                                <CardContent>
                        <Typography variant="h3">
                        This web application has been created for the course "Internet Technologies" at University of Parma. <br></br>
                        The site has been coded using React native. It allows to store user's datas such as credit cards and payments without take the more private data or the sensitives ones.
                        </Typography>
                        </CardContent>
                        </Card>
                    </Grid>


                    </Grid>
            </div>
        )
    }
}

export default function Credits() {
    const classes = useStyles();

    return <CreditsBase classes={classes}/>
}