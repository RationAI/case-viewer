import { FormConfigT } from '@/type-definitions';
import React from 'react';
import Form from '../../../components/Forms/Form/Form';

const formConfigExample: FormConfigT = {
  title: 'Title',
  description:
    'saasdnasndnaiosndionsaond inaiondnsadn naicnsadnas iainasndisa inaionias niadasdsa d sad asd asd a s dasdsadasd dasdasdas da',
  rows: [
    {
      fields: [
        {
          type: 'select',
          fieldID: '0',
          label: 'Select',
          defaultValue: 'one',
          description: 'inionsdnasndnakasmdas',
          options: [
            'one',
            'two',
            'three',
            'longer-option',
            'four',
            'five',
            'six',
          ],
        },
        {
          type: 'text',
          fieldID: '1',
          label: 'Text',
          defaultValue: '',
        },
      ],
    },
    {
      fields: [
        {
          type: 'text',
          fieldID: '2',
          label: 'Text',
          defaultValue: '',
        },
      ],
    },
    {
      fields: [
        {
          type: 'text',
          fieldID: '3',
          label: 'Text',
          defaultValue: '',
        },
      ],
    },
    {
      fields: [
        {
          type: 'select',
          fieldID: '4',
          label: 'Select',
          defaultValue: 'one',
          description: 'inionsdnasndnakasmdas',
          options: [
            'one',
            'two',
            'three',
            'longer-option',
            'four',
            'five',
            'six',
          ],
        },
      ],
    },
    {
      fields: [
        {
          type: 'text',
          fieldID: '5',
          label: 'Text',
          defaultValue: '',
        },
        {
          type: 'text',
          fieldID: '6',
          label: 'Text',
          defaultValue: '',
        },
      ],
    },
  ],
};

const UploadForm = () => {
  return <Form config={formConfigExample} formID="uploadForm" />;
};

export default UploadForm;
