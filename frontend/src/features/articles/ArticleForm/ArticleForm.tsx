import { memo, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ArticleFormValues, Props } from './types';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { Form, Editor } from './styled';
import { ArticleContent } from '@/entities/article/model/types';

export const ArticleForm = ({ initialValues, onSubmit, submitTitle }: Props) => {
  const { t } = useTranslation();
  const editorRef = useRef<EditorJS>(null);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ArticleFormValues>({
    defaultValues: {
      title: initialValues?.title ?? '',
    },
  });

  const submit = async (values: ArticleFormValues) => {
    const content = ((await editorRef.current?.save()) as ArticleContent) ?? null;

    return onSubmit({ ...values, content });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <TextField
            autoFocus
            error={!!fieldState.error}
            fullWidth
            helperText={<ErrorMessage errors={errors} name={field.name} />}
            label={t('articleTitle')}
            margin="normal"
            required
            {...field}
          />
        )}
      />
      <Editor data={initialValues?.content as OutputData} ref={editorRef} />
      <Button
        disabled={isSubmitting}
        sx={{ my: 2, marginLeft: 'auto' }}
        type="submit"
        variant="contained"
      >
        {submitTitle}
      </Button>
    </Form>
  );
};

export default memo(ArticleForm);
