import { useEffect, useState } from "react";

interface EntityWithId {
  id: string;
}

interface EntityService<TCreate, TEntity extends EntityWithId> {
  create: (data: TCreate) => Promise<TEntity>;
  update: (id: string, data: TCreate) => Promise<TEntity>;
}

interface UseEntityFormOptions<TCreate, TEntity extends EntityWithId> {
  initialData: TCreate;
  entity?: TEntity | null;
  service: EntityService<TCreate, TEntity>;
  onSuccess?: () => void;
  onClose: () => void;
  prepareDataForEdit?: (entity: TEntity) => TCreate;
  prepareDataForSubmit?: (data: TCreate) => TCreate;
}

export function useEntityForm<TCreate, TEntity extends EntityWithId>({
  initialData,
  entity,
  service,
  onSuccess,
  onClose,
  prepareDataForEdit,
  prepareDataForSubmit,
}: UseEntityFormOptions<TCreate, TEntity>) {
  const isEditing = !!entity?.id;
  
  const [formData, setFormData] = useState<TCreate>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (entity) {
      const editData = prepareDataForEdit 
        ? prepareDataForEdit(entity)
        : { ...initialData, ...entity } as TCreate;
      setFormData(editData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldNames: string[]
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: fieldNames.includes(name)
        ? value === "" ? undefined : Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const finalData = prepareDataForSubmit 
        ? prepareDataForSubmit(formData)
        : formData;

      if (isEditing && entity?.id) {
        await service.update(entity.id, finalData);
      } else {
        await service.create(finalData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    isEditing,
    handleChange,
    handleNumberChange,
    handleSubmit,
  };
}

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const axiosError = err as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An error occurred"
    );
  } else if (err instanceof Error) {
    return err.message;
  }
  return "An unknown error occurred";
}
