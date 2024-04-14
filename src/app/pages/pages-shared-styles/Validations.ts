export const Validations = {

    isNotBlank: (values: string[]): boolean => {
        if (values.length < 1) return false;
        for (let x: number = 0; x < values.length; x++) {
            if (values[x] == null) return false;
            if (values[x].trim().length < 1) return false;
        }
        return true;
    }

};