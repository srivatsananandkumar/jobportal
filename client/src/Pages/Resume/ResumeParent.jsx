import React from 'react';
import { useParams } from 'react-router-dom';
import Template1 from './Template1.jsx';
import Template2 from './Template2.jsx';
// import Template3 from './Template3';

const TemplateRenderer = () => {
  const { templateId } = useParams();

  switch (templateId) {
    case 'template1':
      return <Template1 />;
    case 'template2':
      return <Template2 />;
    // case 'template3':
    //   return <Template3 />;
    default:
      return <div>Invalid Template</div>;
  }
};

export default TemplateRenderer;
