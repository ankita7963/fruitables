import { BarChart, Title } from '@mui/icons-material';
import { Box, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { token } from '../../theme';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';



const StateCart = ({ data }) => {
    const theme = useTheme();
    const color = token(theme.palette.mode);
    console.log('data', data);



    return (
        <Paper elevation={5} sx={{ p: 4 }}>
            <Grid container>
                <Grid size={8}>
                    <Typography variant='h6' sx={{ fontWeight: '530', color: 'text.primary' }}>{data.title}</Typography>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', my: 2, color: 'text.primary' }}>{data.count}</Typography>
                    <Box display={'flex'}>
                        <KeyboardDoubleArrowUpIcon sx={{ color: color.primary[500] }} />
                        <Typography component={'span'} sx={{ mx: 0.5, fontWeight: '550' }}> {data.per} </Typography>
                        <Typography component={'p'} color='text.secondary'> last 7 days </Typography>
                    </Box>
                </Grid>

                <Grid size={4}>
                    <SparkLineChart
                        sx={{ display: 'flex', justifyContent: 'flex-end', width: 80, height: 80 }}
                        plotType="bar"
                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                        showHighlight={data.showHighlight}
                        showTooltip={data.showTooltip}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}


function Dashboard(props) {

    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);

    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };

    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };


    const StateCartData = [
        { _id: 1, title: "Product", count: '18,785', per: '+2.6%' },
        { _id: 2, title: "Revenue", count: '18,785', per: '+2.6%' },
        { _id: 3, title: "Customs", count: '18,785', per: '+2.6%' },
        { _id: 4, title: "services", count: '18,785', per: '+2.6%' }

    ];


    return (
        <>
            <Grid container rowSpacing={5} columnSpacing={6}>

                {StateCartData.map((v, i) => (
                    <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }} key={v._id}>
                        <StateCart data={{...v,showHighlight,showTooltip }} />
                    </Grid>
                ))}

                {/* <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }}
                >
                    <StateCart
                        data={{
                            title: "Product",
                            count: '18,785',
                            per: '+2.6%',
                            showHighlight,
                            showTooltip
                        }}
                    />
                </Grid>


                <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }}
                >
                    <StateCart
                        data={{
                            title: "Revenue",
                            count: '18,785',
                            per: '+2.6%',
                            showHighlight,
                            showTooltip
                        }}
                    />
                </Grid>


                <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }}
                >
                    <StateCart
                        data={{
                            title: "Customs",
                            count: '18,785',
                            per: '+2.6%',
                            showHighlight,
                            showTooltip
                        }}
                    />
                </Grid>


                <Grid size={{ xs: 12, sm: 4, md: 6, lg: 3 }}
                >
                    <StateCart
                        data={{
                            title: "services",
                            count: '18,785',
                            per: '+2.6%',
                            showHighlight,
                            showTooltip
                        }}
                    />
                </Grid> */}

            </Grid >


            <Grid>
                <Grid>
                    <Typography variant='h5'>


                    </Typography>

                </Grid>
            </Grid>

        </>
    );
}

export default Dashboard;