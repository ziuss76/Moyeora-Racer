"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollButton = exports.MainContentHeaderBlock = exports.PageNationBlockBtn = exports.PageNationBlock = exports.DetailBtn = exports.TableSearchResult = exports.TableTitle = exports.TableTitleBlock = exports.NotificationInfo = exports.NotificationListBlock = exports.TableRowInfo = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const ModalComponents_1 = require("./ModalComponents");
// 테이블 요소들
const tableRowSetting = `
display: grid;
grid-template-columns: 9rem 20rem 20rem 13rem 9rem 9rem;
grid-template-rows: 5rem;
justify-items: center;
align-items: center;

& > span {
	font-size: 1.4rem;
}`;
exports.TableRowInfo = styled_components_1.default.div `
  ${tableRowSetting}
  border-bottom: 1px solid #000;

  font-weight: 'bold';
`;
exports.NotificationListBlock = styled_components_1.default.ul `
  min-height: 615px;
`;
exports.NotificationInfo = styled_components_1.default.li `
  ${tableRowSetting}
  border-bottom: 1px solid #d6c9ff;

  &:nth-child(even) {
    background-color: #faf7ff;
  }

  & .title,
  & .content {
    max-width: 17rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
exports.TableTitleBlock = styled_components_1.default.div `
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
`;
exports.TableTitle = styled_components_1.default.h2 `
  font-size: 1.8rem;
  font-weight: bold;
`;
exports.TableSearchResult = styled_components_1.default.h3 `
  font-size: 1.6rem;
  font-weight: 500;

  color: #aeaeae;
`;
exports.DetailBtn = styled_components_1.default.button `
  padding: 0.7rem 1rem 0.6rem 1rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.4rem;

  background-color: #fcfcfe;

  font-weight: 500;
`;
// 페이지네이션
exports.PageNationBlock = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 5.5rem;
  margin-bottom: 10rem;
`;
exports.PageNationBlockBtn = styled_components_1.default.button `
  width: 3rem;
  height: 3rem;
  padding-left: 0.1rem;
  border: 1px solid gray;
  border-radius: 0.4rem;

  background-color: #fff;

  font-size: 1.4rem;
  text-align: center;
  line-height: 3rem;

  cursor: pointer;

  &.now-page {
    border: none;

    background-color: #7353ea;
  }
  &.now-page > p {
    color: #ffffff;
  }
`;
exports.MainContentHeaderBlock = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;
exports.EnrollButton = (0, styled_components_1.default)(ModalComponents_1.ModalButton) `
  padding: 0.7rem 1.5rem;
`;