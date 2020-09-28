import React, {Component} from "react";
import {Card, CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../theme";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    avatar: {
        display: 'inline-block',
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: theme.spacing(2)
    },
    title:{
        color:"red"
    },
    subtitle:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        fontSize: "24px",
        color:"orange"
    }

});

class CreditsCardBase extends Component {

render() {
        return(
            <Card className={this.props.classes.root} variant="outlined" style = {{backgroundColor: this.props.color, opacity: 0.85}}>
                <Avatar alt="Photo" src={this.props.image} className={this.props.classes.avatar} />
                <CardHeader
                    titleTypographyProps={{ component: "h1", variant: "h1" }}
                    title= {this.props.name}
                />
                <CardContent>
                    <Typography className={this.props.classes.subtitle}>GitHub</Typography>
                    <Typography variant="h4"> <a href={this.props.github}> {this.props.github} </a></Typography>
                    <Typography className={this.props.classes.subtitle}>Email</Typography>
                    <Typography variant="h4"> {this.props.email} </Typography>
                    {/*maybe create a collapse card with a long and nice description*/}
                </CardContent>
            </Card>
        )
}

}

export default function CreditsCard(props) {
    const classes = useStyles();

    return <CreditsCardBase classes={classes} {...props} />;
}