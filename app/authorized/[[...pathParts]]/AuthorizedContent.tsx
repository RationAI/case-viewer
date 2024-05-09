'use client';

import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import React, { useContext } from 'react';
import AnnotationsPage from '../annotations/AnnotationsPage';
import UploadPage from '../upload/UploadPage';
import InvalidPathPage from '../../components/InvalidPathPage/InvalidPathPage';
import UserPage from '../user/UserPage';
import CasesPage from '../cases/CasesPage';
import FeedbackPage from '../feedback/FeedbackPage';
import { PathPartsContext } from './AuthorizedApp';

type Props = {
  caseHierarchy: CaseHierarchy;
};

const AuthorizedContent = ({ caseHierarchy }: Props) => {
  const pathParts = useContext(PathPartsContext);

  let pageToRender;

  if (pathParts.length > 1) {
    switch (pathParts[1]) {
      case 'annotations':
        pageToRender = <AnnotationsPage />;
        break;
      case 'cases':
        pageToRender = <CasesPage caseHierarchy={caseHierarchy} />;
        break;
      case 'upload':
        pageToRender = <UploadPage />;
        break;
      case 'user':
        pageToRender = <UserPage />;
        break;
      case 'feedback':
        pageToRender = <FeedbackPage />;
        break;
      default:
        pageToRender = <InvalidPathPage />;
    }
  } else {
    pageToRender = <div>Congrats! You are authorized!</div>;
  }

  return <>{pageToRender}</>;
};

export default AuthorizedContent;
