import React from 'react';
import { Text } from 'react-native';
import useTheme from '../../hooks/useTheme';

const Heading = (props) => {
  const { theme } = useTheme();
  return (
    <Text
      {...props}
      style={{
        fontSize: 17,
        fontFamily: theme.font.w600,
        alignSelf: 'flex-start',
        color: theme.textPrimary,
        marginBottom: 10,
        ...props.style,
      }}
    />
  );
};

export default Heading;
