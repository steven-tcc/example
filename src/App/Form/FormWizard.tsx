import { ElementType } from 'react';
import { useSearchParams, NavigateOptions } from 'react-router-dom';

import Fade from '@mui/material/Fade';

import { appTitle } from '../../constants';
import { scrollToTop, setDocumentTitle } from '../../utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import FormStepper from './FormStepper';
import BackButton from '@mui/material/Button';

import NoMatch from '../NoMatch';

export type TPageProps = {
  nextPageTitle: string;
  goToNextPage: (options?: NavigateOptions) => void;
  goToPrevPage: (options?: NavigateOptions) => void;
  pageProps?: unknown;
};

interface GenericFormWizardProps {
  pages: Page[];
  pageProps?: unknown;
}

type Page = {
  title?: string;
  hideBackButton?: boolean;
  hideSteps?: boolean;
  step?: string;
  completeStep?: boolean;
  hidePageTitle?: boolean;
  page: ElementType;
  fields?: string[];
};

function Component({ pages, pageProps }: GenericFormWizardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  scrollToTop();
  const page = Number(searchParams.get('page'));
  const allSteps = pages.map((page) => page.step).filter((step) => step !== undefined) as string[];
  const steps = [...new Set(allSteps)];

  const goToNextPage = (options?: NavigateOptions) => {
    const params = new URLSearchParams();
    params.set('page', page + 1 + '');
    setSearchParams(params, options);
  };
  const goToPrevPage = (options?: NavigateOptions) => {
    const params = new URLSearchParams();
    params.set('page', page > 0 ? page - 1 + '' : '0');
    setSearchParams(params), options;
  };

  const PageComponent = pages[page]?.page;
  const PrevPageComponent = pages[page - 1]?.page;
  const hideBackButton = pages[page]?.hideBackButton;

  const pageTitle = pages[page]?.title || appTitle;
  const hidePageTitle = pages[page]?.hidePageTitle;
  const prevPageTitle = pages[page - 1]?.title;
  const nextPageTitle = pages[page + 1]?.title;

  const hideSteps = pages[page]?.hideSteps || steps.length === 0;
  const isCompleteStep = (steps.length > 0 && pages[page]?.completeStep) || false;

  setDocumentTitle(pageTitle);

  return (
    <Container disableGutters maxWidth="xs">
      {PageComponent ? (
        <Stack spacing={5}>
          {PrevPageComponent && !hideBackButton ? (
            <Box sx={{ width: '100%' }}>
              <BackButton onClick={() => goToPrevPage()}>{prevPageTitle}</BackButton>
            </Box>
          ) : null}

          {hideSteps ? null : (
            <FormStepper steps={steps} activeStep={isCompleteStep ? steps.length : steps.indexOf(pages[page].step || '')} />
          )}

          {pages.map(({ page: Page }, i) =>
            page === i ? (
              <Box key={i}>
                <Fade in appear={pages.length !== 1}>
                  <div>
                    <Stack spacing={5}>
                      {hidePageTitle ? null : <Typography variant="h4">{pageTitle}</Typography>}
                      <Box>
                        <Page
                          pageProps={pageProps}
                          nextPageTitle={nextPageTitle}
                          goToNextPage={goToNextPage}
                          goToPrevPage={goToPrevPage}
                        />
                      </Box>
                    </Stack>
                  </div>
                </Fade>
              </Box>
            ) : null,
          )}
        </Stack>
      ) : (
        <NoMatch />
      )}
    </Container>
  );
}

export default Component;
