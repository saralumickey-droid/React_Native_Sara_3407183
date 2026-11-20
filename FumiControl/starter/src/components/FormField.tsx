import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  multiline?: boolean;
}

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <TextInput
            style={[
              styles.input,
              multiline && styles.multiline,
              error && styles.inputError,
            ]}
            placeholder={placeholder}
            placeholderTextColor="#999999"
            value={value === undefined || value === null ? '' : String(value)}
            onChangeText={(text) => {
              if (
                keyboardType === 'numeric' ||
                keyboardType === 'decimal-pad'
              ) {
                const valor = text.trim().replace(',', '.');
                onChange(valor === '' ? undefined : Number(valor));
              } else {
                onChange(text);
              }
            }}
            onBlur={onBlur}
            keyboardType={keyboardType}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
          />

          {error && (
            <Text style={styles.errorText}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#263238',
    backgroundColor: '#FFFFFF',
  },
  multiline: {
    minHeight: 90,
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 5,
  },
});
