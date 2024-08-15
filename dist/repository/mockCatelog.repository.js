"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCatalogRepository = void 0;
class MockCatalogRepository {
    create(data) {
        const mockproduct = Object.assign({ id: 123 }, data);
        return Promise.resolve(mockproduct);
    }
    update(data) {
        return Promise.resolve(data);
    }
    delete(id) {
        return Promise.resolve(id);
    }
    find(limit, offset) {
        return Promise.resolve([]);
    }
    findOne(id) {
        return Promise.resolve({});
    }
}
exports.MockCatalogRepository = MockCatalogRepository;
