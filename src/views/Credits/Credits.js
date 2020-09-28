import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme";
import {Grid} from "@material-ui/core";
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
                    image:"https://picsum.photos/200/300",
                    github: "https://github.com/danielepelleg",
                    email: "dannonsolamail@gmail.com",
                    description: "i'm a good guy"
                },
                {
                    name: "Guido Soncini",
                    image:"https://picsum.photos/200/300",
                    github: "https://github.com/gweedo",
                    email: "guido.s1998@gmail.com",
                    description: "lol"
                }
        ]
        const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed massa ante. Etiam suscipit nulla a ligula fermentum, sed feugiat nulla sollicitudin. Donec vestibulum, massa at sagittis placerat, magna purus dictum orci, quis sodales velit ante eu tellus. Duis quis est odio. Pellentesque venenatis a ipsum ac mattis. Nam sit amet ligula vel libero malesuada tempus ut id lacus. Quisque urna arcu, maximus ac dignissim at, egestas ac quam. Curabitur sed dictum lectus. Ut magna dolor, semper et diam eu, placerat commodo nibh. Nam vitae rutrum est, ut porta est. Duis cursus at elit vitae tempor."
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={3}>
                    <Grid
                        item
                        lg={2}
                        md={6}
                        xl={4}
                        xs={12}
                    />
                    { authors.map((_author) =>{
                        return(
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                <CreditsCard name = {_author.name} github={_author.github} email = {_author.email} image={_author.image} description = {_author.description}/>
                            </Grid>
                        );
                    })}
                    <Grid
                        item
                        lg={9}
                        md={6}
                        xl={9}
                        xs={12}>
                        <Typography ></Typography>
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