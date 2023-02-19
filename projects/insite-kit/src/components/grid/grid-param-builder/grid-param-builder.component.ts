/**
 * Grid param builder class
 *
 * @author Sam Butler
 * @since February 18, 2023
 */
export class GridParamBuilder {
  private params: Map<string, string[]> = new Map<string, string[]>();

  withPaging(page: number, size: number): GridParamBuilder {
    const rowOffsetSize = (page - 1) * size;

    this.params.set('pageSize', [size.toString()]);
    this.params.set('rowOffset', [rowOffsetSize.toString()]);
    return this;
  }

  withSearch(search): GridParamBuilder {
    if (search != '') {
      this.params.set('search', [search]);
    }
    return this;
  }

  build() {
    return this.params;
  }
}
