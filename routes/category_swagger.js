// routes/category_swagger.js

const categorySwagger = {
  paths: {
    '/category': {
      get: {
        tags: ['Categories'],
        summary: 'Ambil semua kategori',
        responses: {
          200: {
            description: 'Success'
          }
        }
      },
      post: {
        tags: ['Categories'],
        summary: 'Tambah kategori baru',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Teknologi'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Kategori berhasil dibuat'
          }
        }
      }
    },

    '/category/{id}': {
      put: {
        tags: ['Categories'],
        summary: 'Update kategori',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Olahraga'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Kategori berhasil diupdate'
          }
        }
      },

      delete: {
        tags: ['Categories'],
        summary: 'Hapus kategori',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            }
          }
        ],
        responses: {
          200: {
            description: 'Kategori berhasil dihapus'
          }
        }
      }
    }
  }
}

module.exports = categorySwagger