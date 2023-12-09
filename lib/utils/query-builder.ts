class Query {
    private queryFields: {
        where: string[];
        fields?: string;
        exclude?: string;
        sort?: string;
        limit?: string;
        offset?: string;
        search?: string;
    };

    constructor() {
        this.queryFields = {
            where: [],
        };
    }

    fields(fields: string | string[]): this {
        if (fields) {
            let fieldsString =
                fields && Array.isArray(fields) ? fields.join(',') : fields;
            fieldsString = fieldsString ? fieldsString.replace(/\s/g, '') : '';
            this.queryFields.fields = `fields ${fieldsString}`;
        }
        return this;
    }

    exclude(exclude: string | string[]): this {
        if (exclude) {
            let excludeString =
                exclude && Array.isArray(exclude) ? exclude.join(',') : exclude;
            excludeString = excludeString ? excludeString.replace(/\s/g, '') : '';
            this.queryFields.exclude = `exclude ${excludeString}`;
        }
        return this;
    }

    sort(field: string, direction?: string): this {
        if (field) {
            if (
                field.toLowerCase().endsWith(' desc') ||
                field.toLowerCase().endsWith(' asc')
            ) {
                this.queryFields.sort = `sort ${field}`;
            } else {
                this.queryFields.sort = `sort ${field} ${direction || 'asc'}`;
            }
        }
        return this;
    }

    limit(limit: string): this {
        if (limit) {
            this.queryFields.limit = `limit ${limit}`;
        }
        return this;
    }

    offset(offset: string): this {
        if (offset) {
            this.queryFields.offset = `offset ${offset}`;
        }
        return this;
    }

    search(search: string): this {
        if (search) {
            this.queryFields.search = `search "${search}"`;
        }
        return this;
    }

    where(filters: string | string[]): this {
        if (filters) {
            if (Array.isArray(filters)) {
                this.queryFields.where.push(`where ${filters.join(' & ')}`);
            } else {
                this.queryFields.where.push(`where ${filters.trim()}`);
            }
        }
        return this;
    }

    build(): string {
        const { where, ...rest } = this.queryFields;
        const query = Object.keys(this.queryFields).length > 1 || this.queryFields.where.length > 0
            ? Object.values(rest).concat(where).join(';') + ';' : '';
        return query;
    }
}

export default Query;