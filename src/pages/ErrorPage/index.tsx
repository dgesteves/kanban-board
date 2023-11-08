import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Errors } from '../../constants/errors';
import { StatusCodes } from '../../constants/statusCodes';
import { StyledError, StyledErrorLink, StyledErrorText } from './Styles';
import { useCallback } from 'react';

export default function ErrorPage() {
  const error = useRouteError();

  const renderError = useCallback(
    (message: string) => (
      <StyledError>
        <StyledErrorText>{message}</StyledErrorText>
        <StyledErrorLink to="/boards">Go to back to boards</StyledErrorLink>
      </StyledError>
    ),
    []
  );

  if (isRouteErrorResponse(error)) {
    if (error.status === StatusCodes.NOT_FOUND) {
      return renderError(Errors.NOT_FOUND_ERROR);
    }

    if (error.status === StatusCodes.UNAUTHORIZED) {
      return renderError(Errors.AUTH_ERROR);
    }

    if (error.status === StatusCodes.API_ERROR) {
      return renderError(Errors.API_ERROR);
    }
  }

  return renderError(Errors.GENERIC_ERROR);
}
