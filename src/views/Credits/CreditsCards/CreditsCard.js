import React, {Component} from "react";
import {Card} from "@material-ui/core";
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
        marginTop: theme.spacing(1),
        color:"orange"
    }

});

class CreditsCardBase extends Component {

render() {
        return(
            <Card className={this.props.classes.root} variant="outlined">
                <CardContent>
                    <Avatar alt="Photo" src={this.props.image} className={this.props.classes.avatar} />
                    <Typography variant="h4" component="h3" className={this.props.classes.title}> {this.props.name} </Typography>
                    <Typography className={this.props.classes.subtitle}>GitHub</Typography>
                    <Typography component="p"> {this.props.github} </Typography>
                    <Typography className={this.props.classes.subtitle}>Email</Typography>
                    <Typography component="p"> {this.props.email} </Typography>
                    <Typography className={this.props.classes.subtitle}>Description</Typography>
                    {/*maybe create a collapse card with a long and nice description*/}
                    <Typography component="p"> {this.props.description}</Typography>
                </CardContent>
            </Card>
        )
}

}

export default function CreditsCard(props) {
    const classes = useStyles();

    return <CreditsCardBase classes={classes} {...props} />;
}