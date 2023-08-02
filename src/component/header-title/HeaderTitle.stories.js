import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderTitle from './HeaderTitle';

// This is the story for your HeaderTitle component
storiesOf('HeaderTitle', module)
  .add('Default', () => (
    <HeaderTitle
      primaryTitle="Primary Title"
      secondaryTitle="Secondary Title"
    />
  ));
