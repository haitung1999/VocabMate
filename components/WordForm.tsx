import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

type Props = {
  onSubmit: (
    term: string,
    meaning: string,
    example: string,
    category: string,
  ) => void;
  categories: string[];
  initialTerm?: string;
  initialMeaning?: string;
  initialExample?: string;
  initialCategory?: string;
  isEdit?: boolean;
};

const WordForm: React.FC<Props> = ({
  onSubmit,
  categories,
  initialTerm = '',
  initialMeaning = '',
  initialExample = '',
  initialCategory,
  isEdit = false,
}) => {
  const [term, setTerm] = useState(initialTerm);
  const [meaning, setMeaning] = useState(initialMeaning);
  const [example, setExample] = useState(initialExample);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(
    initialCategory || categories[0] || '',
  );
  const [items, setItems] = useState<ItemType<string>[]>([]);

  useEffect(() => {
    setItems(categories.map(cat => ({label: cat, value: cat})));
  }, [categories]);

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="📝 Từ vựng"
        value={term}
        onChangeText={setTerm}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="💡 Nghĩa"
        value={meaning}
        onChangeText={setMeaning}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="✏️ Ví dụ"
        value={example}
        onChangeText={setExample}
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={3}
      />
      <DropDownPicker
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Chọn bộ từ"
        zIndex={1000}
        disabled={Boolean(initialCategory)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit(term, meaning, example, category)}>
        <Text style={styles.buttonText}>
          {isEdit ? 'Lưu thay đổi' : 'Thêm từ'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  dropdownWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdown: {
    borderRadius: 12,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    minHeight: 60,
    width: '90%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    zIndex: 1000,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    color: '#222',
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  button: {
    width: '90%',
    backgroundColor: '#4FC3F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default WordForm;
