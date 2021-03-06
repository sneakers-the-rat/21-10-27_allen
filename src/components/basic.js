import React from 'react';
import {Text, Heading, SlideContext, useSteps} from 'spectacle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';



export function PositionedHeading(
    {
      x=0,
      y=0,
        right=false,
        bottom=false,
        id='',
        light=true,
        align='left',
        children,
        headerProps={},
        ...rest
    }){
  const classes = makeStyles({
    header: {
      fontFamily: rest.fontFamily ? rest.fontFamily : '"Helvetica Neue" Helvetica sans-serif',
      fontWeight: headerProps.fontWeight ? headerProps.fontWeight : rest.fontWeight ? rest.fontWeight : 200,
      fontSize: headerProps.fontSize ? headerProps.fontSize : rest.fontSize ? rest.fontSize : 72,
      marginBottom:0,
      color: light ? "#EEEEEE" : "#222222",
      lineHeight:1.1,
      ...rest
    },
    headerContainer:{
      position:'absolute',
    },
  })();
  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);
  const container = React.useRef();

  React.useEffect(() => {
    bottom === false ?
      container.current.style.top = y+"px" :
        container.current.style.bottom = bottom+"px";

    right === false ?
      container.current.style.left = x+"px" :
        container.current.style.right = right+'px'

  }, [x, y])

  return(
      <div id={id} ref={container} className={classes.headerContainer}>
      <Typography className={classes.header} align={align} {...rest} {...headerProps}>
        {children}
      </Typography>
      </div>
  )
}

export function Collapser({
    id,
    children,
    stepIndex
}){

  const numberOfSteps = 1

  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);

  const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {
    id, stepIndex,
  });

  return(
      <Collapse in={isActive}>
        {placeholder}
        {children}
      </Collapse>
  )

}

export function IFrame({
    src,
    paper,
    style={width:"100%", height:"100%"}
   }){
  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);


  const renderthis = paper ?
      <Paper elevation={1} style={style}>
        {isSlideActive && <iframe frameBorder={'0'} className={'iframe-component'} width={"100%"} height={"100%"}  loading={"lazy"} src={src}/>}
          </Paper>
     :
      <>{isSlideActive && <iframe frameBorder={'0'} className={'iframe-component'} width={"100%"} height={"100%"}  loading={"lazy"} src={src}/>}</>

  return(
      {...renderthis}
  )
}
  IFrame.defaultProps = {
    paper:true
    }

