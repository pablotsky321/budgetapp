-- Trigger for updating user expenses after inserting a bill
CREATE OR REPLACE FUNCTION update_user_expenses_after_insert_bill_func()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET expenses = expenses + NEW.bill_value
  FROM billType
  WHERE users.id = billType.user_id
    AND billType.id = NEW.bill_type_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_expenses_after_insert_bill
AFTER INSERT ON bills
FOR EACH ROW
EXECUTE FUNCTION update_user_expenses_after_insert_bill_func();

-- Trigger for updating user expenses after deleting a bill
CREATE OR REPLACE FUNCTION update_user_expenses_after_delete_bill_func()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET expenses = expenses - OLD.bill_value
  FROM billType
  WHERE users.id = billType.user_id
    AND billType.id = OLD.bill_type_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_expenses_after_delete_bill
AFTER DELETE ON bills
FOR EACH ROW
EXECUTE FUNCTION update_user_expenses_after_delete_bill_func();

-- Trigger for updating user expenses after updating a bill
CREATE OR REPLACE FUNCTION update_user_expenses_after_update_bill_func()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate the difference in bill_value
  -- Update the expenses for the corresponding user
  UPDATE users
  SET expenses = expenses + (NEW.bill_value - OLD.bill_value)
  FROM billType
  WHERE users.id = billType.user_id
    AND billType.id = NEW.bill_type_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_expenses_after_update_bill
AFTER UPDATE OF bill_value ON bills
FOR EACH ROW
EXECUTE FUNCTION update_user_expenses_after_update_bill_func();
