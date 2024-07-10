import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { C42_GREEN } from '@/style/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button42: React.FC<ButtonProps> = ({
  title,
  onPress
}: {
  title: string;
  onPress: any;
}) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: C42_GREEN }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 13,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default Button42;
