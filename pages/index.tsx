import React, { useCallback, useState } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Layout from '../components/Layout';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
// import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Hidden from '@material-ui/core/Hidden';
import ImgUrl from '../components/ImgUrl';
import ImgPreview from '../components/ImgPreview';

// function HideOnScroll({ children }: { children: React.ReactElement }) {
//   const trigger = usescrolltrigger({
//     disablehysteresis: true,
//     threshold: 0
//   });
//
//   return <Collapse in={!trigger}>{children}</Collapse>;
// }

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('md')]: {
      maxWidth: theme.breakpoints.values.sm
    }
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row'
    }
  },
  imagePanel: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.sm
    }
  },
  imgPreviewOuter: {
    width: '100%',
    minHeight: 200,
    [theme.breakpoints.up('lg')]: {
      minHeight: 100,
      width: theme.breakpoints.values.sm
    }
  },
  imgPreviewFixLgUp: {
    [theme.breakpoints.up('lg')]: {
      position: 'fixed',
      top: 70,
      maxWidth: theme.breakpoints.values.sm
    }
  },
  imageUrlOuterLgUp: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block'
    }
  }
}));

const IndexPage = () => {
  const theme = useTheme();
  const classes = useStyles();

  // useMediaQuery ?????????????????? false ?????????? PC ????????????(lg)???????????????????????????????????????????????????????????????/
  // ??????????????????(Android ??? Chrome)???????????????????????????
  // ????????????PC ?????? md ???????????????????????????????????????????????????
  // TODO: makeStyle ??? CSS ??????????????????
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [baseUrl, setBaseUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const debounceBaseUrl = useCallback(() => {
    // ???????????????????????????
    let id: any = 0;
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (id !== 0) {
        clearTimeout(id);
      }
      id = setTimeout(
        (newValue) => {
          // set???????????????????????????????????????????????????????
          setBaseUrl(newValue);
          id = 0;
        },
        100,
        e.target.value
      );
    };
  }, []);

  const imgPreviewProps = mdDown
    ? {
        width: undefined,
        // ?????????????????????????????????????????????(ImgPreview????????????)
        height: 200
      }
    : {
        width: theme.breakpoints.values.sm - 50,
        height: undefined
      };
  const imgPreviewThumbProps = {
    position: 'fixed',
    top: 0,
    width: undefined,
    // ?????????????????????????????????????????????(ImgPreview????????????)
    height: 100
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250
  });
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Box
        position="fixed"
        top={0}
        // left={0}
        // right={0}
        style={{
          width: '100%', // dialog ?????????????????????????????????????????????????????????????????????
          // height: trigger ? 200 : 0,
          // maxHeight: 10,
          zIndex: theme.zIndex.appBar
        }}
      >
        <Fade in={trigger} timeout={{ enter: 700 }}>
          <Paper
            square
            style={{
              position: 'fixed',
              top: 0,
              width: '100%',
              height: 100,
              padding: trigger ? theme.spacing(1) : 0
            }}
          >
            {trigger && (
              <ImgPreview previewUrl={previewUrl} {...imgPreviewThumbProps} />
            )}
          </Paper>
        </Fade>
      </Box>
      <Container className={classes.container}>
        <Box className={classes.root}>
          <Box className={classes.imagePanel}>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              className={classes.imgPreviewOuter}
            >
              <Box className={classes.imgPreviewFixLgUp}>
                <Box>
                  <TextField
                    id="image-url"
                    label="Image URL"
                    defaultValue={''}
                    fullWidth
                    onChange={debounceBaseUrl()}
                  />
                </Box>
                <Box mt={2} className={classes.imageUrlOuterLgUp}>
                  <Typography variant="body1">
                    ????????????????????????????????????????????????????????????microCMS ????????????????
                    ?????????????????????????????????????????????????????????????????????????????????(??????????????????????????????)
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Fade in={!trigger} timeout={{ enter: 700 }}>
                    <Paper
                      square
                      elevation={0}
                      style={{ minHeight: 220, width: '100%' }}
                    >
                      <ImgPreview
                        position={trigger ? 'fixed' : 'static'}
                        previewUrl={previewUrl}
                        {...imgPreviewProps}
                      />
                    </Paper>
                  </Fade>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            mt={2}
            p={1}
            flexGrow={1}
            style={{ maxWidth: theme.breakpoints.values.sm }}
          >
            <ImgUrl
              paramsItem={[
                {
                  paramsKey: 'blur'
                },
                {
                  paramsKey: 'mark'
                },
                {
                  paramsKey: 'mark-alpha'
                },
                {
                  paramsKey: 'blend'
                },
                {
                  paramsKey: 'txt'
                },
                {
                  paramsKey: 'txt-size'
                },
                {
                  paramsKey: 'txt-color'
                },
                {
                  paramsKey: 'txt-align'
                }
              ]}
              baseUrl={baseUrl}
              onChange={({ value }) => {
                // console.log(value);
                setPreviewUrl(value);
              }}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
